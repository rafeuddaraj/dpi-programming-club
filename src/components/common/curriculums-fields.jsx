"use client"

import { Input } from "../input";
import { Button } from "../ui/button";

const { useFieldArray } = require("react-hook-form");

const CurriculumFields = ({ form }) => {
    const { control, register } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "curriculums",
    });

    return (
        <div className="space-y-2">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                    <Input
                        {...register(`curriculums.${index}`)}
                        placeholder="Enter curriculum"
                    />
                    <Button variant="outline" type="button" onClick={() => remove(index)}>
                        Remove
                    </Button>
                </div>
            ))}
            <Button type="button" onClick={() => append("")}>
                Add Curriculum
            </Button>
        </div>
    );
};

export default CurriculumFields