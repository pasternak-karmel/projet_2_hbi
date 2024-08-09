import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NavMenu() {
  return (
    <div className="flex justify-between items-center ">
      <div className="text-[24px] font-bold">MarketPlace</div>
      <Select>
        <SelectTrigger className="w-[180px] ml-[10px] px-[16px] py-[8px] bg-[#6a1b9a] text-[#fff] border-[none] rounded-[5px] cursor-pointer">
          <SelectValue placeholder="Select a option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categorie</SelectLabel>
            <SelectItem value="apple">Articles</SelectItem>
            <SelectItem value="banana">Membres</SelectItem>
            <SelectItem value="blueberry">Centre d&apos;aide</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        className="p-[8px] w-[300px] rounded-[5px] border-[1px] border-[solid] border-[#ccc]"
        type="text"
        placeholder="Rechercher un article..."
      />
      <div>
        <Button className="ml-[10px] px-[16px] py-[8px] bg-[#6a1b9a] text-[#fff] border-[none] rounded-[5px] cursor-pointer">
          Inscription/Connexion
        </Button>
        <Button className="ml-[10px] px-[16px] py-[8px] bg-[#6a1b9a] text-[#fff] border-[none] rounded-[5px] cursor-pointer">
          Publier un Article
        </Button>
      </div>
    </div>
  );
}
