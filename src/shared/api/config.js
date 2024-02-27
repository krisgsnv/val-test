import md5 from "md5";
import { dateForAuth } from "@/shared/lib/date";

const url = "https://api.valantis.store:41000";

const headers = {
    "Content-Type": "application/json;charset=utf-8",
    "X-Auth": md5(`Valantis_${dateForAuth()}`)
};

export const makeRequest = async (body, method = "POST") => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
    } catch (err) {
        console.error(`${err?.name}: ${err?.message}`);
        setTimeout(makeRequest(body), 3000);
    }
};
