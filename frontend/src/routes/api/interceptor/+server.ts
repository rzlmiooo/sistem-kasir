import type { RequestHandler } from './$types';
import axios from "axios";
import { json } from "@sveltejs/kit";

import { API_URL } from "$env/static/private";

console.log("api:", API_URL);


export const POST: RequestHandler = async ({ request, cookies }) => {
    try {

        const headers: Record<string, string> = {};

        request.headers.forEach((value, key) => {
            if (key.toLowerCase().startsWith("x-")) {
                headers[key.toLowerCase()] = value;
            }
        });

        const endpoint = headers["x-endpoint"];

        if (!endpoint) {
            return json(
                { error: "Endpoint not specified" },
                { status: 400 }
            );
        }

        const body = await request.json();

        let customHeader: Record<string, any> = {};
        if (headers["x-custom-header"]) {
            try {
                customHeader = JSON.parse(headers["x-custom-header"]);
            } catch (e) {
                console.error("Failed parse x-custom-header", e);
            }
        }

        const requestHeaders: Record<string, string> = {
            "Content-Type": "application/json",
            ...customHeader
        };

        const result = await axios.post(
            `${API_URL}${endpoint}`,
            body,
            { headers: requestHeaders }
        );

        return json(result.data);

    } catch (err: any) {

        return json(
            err?.response?.data || { error: "Internal server error" },
            { status: err?.response?.status || 500 }
        );

    }
};