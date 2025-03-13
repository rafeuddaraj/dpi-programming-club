"use client"

export default function DeleteModule({ module }) {
    return (
        <>
            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteModule(module.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem>
        </>
    );
}