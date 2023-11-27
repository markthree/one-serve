import {
  basename,
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.208.0/path/mod.ts";

const _dirname = dirname(fromFileUrl(import.meta.url));

const root = resolve(_dirname, "../");

const execPath = Deno.execPath();

const execFile = basename(execPath);

await Deno.copyFile(execPath, resolve(root, execFile));
