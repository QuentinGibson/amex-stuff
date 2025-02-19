import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex h-8 w-12 items-center justify-center rounded text-sm font-bold text-white">
              <Image
                src="/amex-logo.svg"
                alt="American Express logo"
                width={45}
                height={45}
              />
            </div>
          </Link>

          <h1 className="text-3xl font-medium leading-9 text-[#00175a]">Chart Craft</h1>

          {/* Our Logo Section */}
          <Link href="/" className="flex items-center">
            <div className="flex h-8 w-12 items-center justify-center rounded text-sm font-bold text-white">
              <Image
                src="/amex-logo.svg"
                alt="American Express logo"
                width={45}
                height={45}
              />
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
