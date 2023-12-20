"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";

export type BrandColumn = {
  id: string;
  label: string;
  createdAt: string;
  imageUrl: string;
};

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "Фото",
    cell: (image: any) => {
      return (
        <Image src={image.row.original.imageUrl} width={100} height={100} />
      );
    },
  },
  {
    accessorKey: "label",
    header: "Название",
  },
  {
    accessorKey: "createdAt",
    header: "Дата создания",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
