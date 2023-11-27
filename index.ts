import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.208.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.208.0/fs/ensure_dir.ts";

await ensureDir("./kv");

const _dirname = dirname(fromFileUrl(import.meta.url));

const dataDir = resolve(_dirname, "./kv/data");

const kv = await Deno.openKv(dataDir);

const key = ["demo", "sum"];
Deno.serve(async () => {
  await kv.atomic().sum(key, 1n).commit();
  const { value } = await kv.get<{ value: number }>(key);
  return new Response(String(value));
});
