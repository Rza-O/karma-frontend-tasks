import { Button } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddContractModal from "../modules/contracts/AddContractModal";

const Navbar = () => {
   const [open, setOpen] = useState(false);

   return (
      <div className="flex justify-between items-center px-5 py-2">
         <h1 className="text-2xl font-semibold">Contracts</h1>
         <Button icon={<Plus />} onClick={() => setOpen(true)}>
            Create New
         </Button>

         <AddContractModal open={open} onClose={() => setOpen(false)} />
      </div>
   );
};

export default Navbar;
