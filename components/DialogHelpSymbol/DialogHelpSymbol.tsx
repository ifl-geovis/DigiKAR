import { FC } from "react";
import { RxCheck } from "react-icons/rx";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const RightHelpSybol: FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>What does this even mean?</DialogTitle>
        <DialogDescription>
          The distribution of rights during the times of the holy Roman empire
          was complex. We created a symbol with the aim to visualize this
          complex data effectively. Here&apos;s how it works.
        </DialogDescription>
      </DialogHeader>
      <div className="[&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-bold">
        <h2>A point-based approach</h2>
        <p>Lorem ipsum</p>
        <h2>Introducing the snowfloake</h2>
        <p>Every ray of the snowflakes represents one </p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button>
            <RxCheck className="mr-2" /> Done
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default RightHelpSybol;
