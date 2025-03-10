// components/DeleteUserDialog.js
'use client'
import { deleteUser } from '@/app/actions/users';
import { Button } from '@/components/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { useState } from 'react'; // Import ShadCN Dialog components
import { toast } from 'sonner';
export default function DeleteUserDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Open dialog
    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    // Close dialog
    const handleCancelClick = () => {

        setIsDialogOpen(false);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        try {
            const resp = await deleteUser(userId)
            if (resp?.error) {
                throw Error()
            }
            toast.success("User Delete!");
        } catch {
            toast.error("Something went wrong!")
        }
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button variant="destructive" onClick={handleDeleteClick}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
            </Button>

            <Dialog asChild open={isDialogOpen} onClose={handleCancelClick}>
                <DialogContent>
                    <DialogHeader>Are you sure you want to delete this user?</DialogHeader>
                    <p>This action cannot be undone.</p>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            OK
                        </Button>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
