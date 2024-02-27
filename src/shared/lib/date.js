import { padStartZero } from "@/shared/lib/string";

export const dateForAuth = () => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = padStartZero(date.getUTCMonth() + 1);
    const day = padStartZero(date.getUTCDate());
    return [year, month, day].join("");
};
