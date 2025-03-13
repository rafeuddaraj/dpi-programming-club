// components/DeleteUserDialog.js
'use client'
import { deleteUser } from '@/app/actions/users';
import { Button } from '@/components/button';
import Loader from '@/components/common/loader';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; // Import ShadCN Dialog components
import { toast } from 'sonner';
export default function DeleteUserDialog({ userId }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [loading, setLoading] = useState(false)

    // Open dialog
    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    // Close dialog
    const handleCancelClick = () => {

        setIsDialogOpen(false);
    };

    const router = useRouter()

    // Confirm delete
    const handleConfirmDelete = async () => {
        setLoading(true)
        try {
            const resp = await deleteUser(userId)
            if (resp?.error) {
                throw Error()
            }
            toast.success("User Delete!");
            router.push("/dashboard/users")
        } catch {
            toast.error("Something went wrong!")
        }
        setIsDialogOpen(false);
        setLoading(false)
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
                        <Button disabled={loading} variant="destructive" onClick={handleConfirmDelete}>
                            {loading && <Loader />} OK
                        </Button>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
