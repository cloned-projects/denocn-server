import appRender from "../../public/server.js";
import { startup, website } from "../config.ts";

const decoder = new TextDecoder();
const htmlTemplate = decoder.decode(await Deno.readFile("./public/index.html"));

export async function render(url: string, data: any = {}): Promise<string> {
  const { html, state } = await appRender({
    api_base: `http://127.0.0.1:${startup.port}`,
    url,
    data
  });
  return htmlTemplate
    .replace("${page_title}", website.title)
    .replace("${content}", html)
    .replace(
      `</body>`,
      `<script>window.__INIT_STATE__ = ${JSON.stringify(
        state
      )};</script></body>`
    );
}
