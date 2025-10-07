import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={32}
      height={32}
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
      />
      <path
        fill="currentColor"
        d="M168 96H88a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48H96v-32h64Z"
      />
      <circle fill="currentColor" cx="112" cy="128" r="8" />
      <circle fill="currentColor" cx="144" cy="128" r="8" />
    </svg>
  );
}
