export function logout() {

    const cookies = ["_A2R", "_A2F"];

    cookies.forEach((name) => {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    });

    window.location.href = "/auth/login";
}