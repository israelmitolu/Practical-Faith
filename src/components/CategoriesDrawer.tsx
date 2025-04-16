import { Drawer } from "vaul";
import { CategorySelector } from "@/components/CategorySelector";
import { Category } from "@/lib/types";
import { Bookmark } from "lucide-react";

interface CategoriesDrawerProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

export const CategoriesDrawer = ({
  onSelectCategory,
  selectedCategory,
}: CategoriesDrawerProps) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="flex flex-col items-center gap-1 h-auto py-2">
          <Bookmark className="h-6 w-6 text-divine-blue/60" />
          <span className="text-xs font-calligraphy text-base text-divine-blue/60">
            Categories
          </span>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md rounded-t-xl h-[50vh] md:h-[40vh] lg:h-[35vh] flex flex-col">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 mt-4" />
          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-2xl font-script text-divine-blue mb-4 text-center">
              Explore by Category
            </h2>
            <CategorySelector
              onSelectCategory={onSelectCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
