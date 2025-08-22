import {StaticImageData} from "next/image";
import {Icon} from "@phosphor-icons/react";

export interface Toggle {
    id: string;
    icon?: Icon;
    image?: StaticImageData;
    name: string;
    visible: boolean;
    label_visible?: boolean;
}