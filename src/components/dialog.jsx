import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Dialog({ open, onClose, onChange }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader className={"flex flex-col items-center"}>
          <AlertDialogTitle>Quantity(litres)</AlertDialogTitle>
          <input
            className="flex flex-col border-2 rounded-lg m-2 p-2 bg-inherit"
            type="number"
            id="quantity"
            name="quantity"
            onChange={onChange}
          />
          <button
            className="p-2 px-4 border-2 rounded-lg m-2 max-w-fit"
            onClick={onClose}
          >
            Ok
          </button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
