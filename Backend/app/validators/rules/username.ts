import vine from "@vinejs/vine";

// export const usernameRule = vine.createRule<VineString>({
//     validate()
// })

// vine.macro


export function username() {
  return vine
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]+$/)
}
