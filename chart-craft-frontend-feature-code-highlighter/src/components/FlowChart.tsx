import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Mermaid} from "@/components/Mermaid"

export function FlowChart({script} : {script: string}): JSX.Element {
    return (
      <Dialog>
        <DialogTrigger className="rounded-lg bg-[#006FCF] py-2 text-white hover:bg-[#006FCF]/90">
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>FlowChart</DialogTitle>
          </DialogHeader>
          <div className="min-h-[500px]">
            <Mermaid script={script}/>
          </div>
        </DialogContent>
      </Dialog>
    );
}