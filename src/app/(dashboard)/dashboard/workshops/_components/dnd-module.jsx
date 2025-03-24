"use client";

import {
  deleteWorkshopModule,
  updateWorkshopLessons,
  updateWorkshopModulePosition,
} from "@/app/actions/workshops";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "sonner";
import SortableModule from "./sortable-module";

// Sortable Module Component

// Sortable Lesson Component

export function DndModule({ modules: module, workshopId }) {
  const [modules, setModules] = useState(module);
  const [activeId, setActiveId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle module deletion
  const handleDeleteModule = async (moduleId) => {
    if (confirm("Are you sure delete this Module")) {
      try {
        const resp = await deleteWorkshopModule(moduleId);
        if (resp?.error) {
          throw Error();
        }
        setModules(modules.filter((module) => module.id !== moduleId));
        return toast.success("Module successfully deleting.");
      } catch {
        toast.error("Something went wrong!");
      }
    }
  };

  // Handle module drag start
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);

    const draggedModule = modules.find((module) => module.id === active.id);
    if (draggedModule) {
      setActiveModule(draggedModule);
    }
  };

  // Handle lesson drag start
  const handleDragLessonStart = (event) => {
    const { active } = event;
    setActiveLessonId(active.id);

    // Find the lesson across all modules
    for (const module of modules) {
      const lesson = module.lessons.find((lesson) => lesson.id === active.id);
      if (lesson) {
        setActiveLesson(lesson);
        break;
      }
    }
  };

  // Handle module drag end
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = modules.findIndex((item) => item.id === active.id);
      const newIndex = modules.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const newOrder = arrayMove(modules, oldIndex, newIndex);

      const updatedModules = newOrder.map((item, index) => ({
        ...item,
        position: index + 1,
      }));

      try {
        const response = await updateWorkshopModulePosition(updatedModules);

        if (response.error) {
          toast.error("There was a problem updating positions!");
          return;
        }

        setModules(updatedModules);
      } catch (error) {
        toast.error("An unexpected error occurred!");
      }
    }

    setActiveId(null);
    setActiveModule(null);
  };

  // Handle lesson drag end within a module
  const handleDragLessonEnd = async (event, moduleId) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const module = modules.find((module) => module.id === moduleId);
      const oldIndex = module.lessons.findIndex(
        (lesson) => lesson.id === active.id
      );
      const newIndex = module.lessons.findIndex(
        (lesson) => lesson.id === over.id
      );

      const newLessonsOrder = arrayMove(module.lessons, oldIndex, newIndex).map(
        (lesson, index) => ({
          ...lesson,
          position: index + 1,
        })
      );
      const response = await updateWorkshopLessons(newLessonsOrder);

      if (response.error) {
        toast.error("There was a problem updating lesson positions!");
        return;
      }

      const updatedModules = modules.map((mod) =>
        mod.id === moduleId ? { ...mod, lessons: newLessonsOrder } : mod
      );

      setModules(updatedModules);
    }

    setActiveLessonId(null);
    setActiveLesson(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={modules.map((module) => module.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {modules.map((module, index) => (
            <SortableModule
              key={module.id}
              module={module}
              index={index}
              onDeleteModule={handleDeleteModule}
              onDragLessonStart={handleDragLessonStart}
              onDragLessonEnd={handleDragLessonEnd}
            />
          ))}
        </div>
      </SortableContext>

      {/* Overlay for dragging modules */}
      <DragOverlay>
        {activeId && activeModule ? (
          <Card className="opacity-80">
            <CardHeader className="pl-10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{activeModule.name}</CardTitle>
                  <CardDescription>{activeModule.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
