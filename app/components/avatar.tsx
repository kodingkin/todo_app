"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";

import { AvatarIcon } from "./icons";

const handleLogOut = () => {
  window.location.href = "/";
};

export default function AvatarDropdown() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            className="h-[24px] w-[24px]"
            classNames={{ img: "object-cover w-full h-full" }}
            icon={<AvatarIcon />}
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="logout" color="danger" onPress={handleLogOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
