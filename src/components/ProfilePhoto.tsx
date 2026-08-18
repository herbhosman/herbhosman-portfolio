import Image from "next/image";

export function ProfilePhoto() {
  return (
    <div className="hero-rise hero-rise-delay-1 relative shrink-0">
      <div className="relative h-20 w-20 overflow-hidden border-2 border-surface shadow-[0_12px_40px_rgba(26,23,20,0.16)] sm:h-36 sm:w-36">
        <Image
          src="/herb-hosman.jpg"
          alt="Herbert Hosman"
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="(max-width: 640px) 80px, 144px"
        />
      </div>
    </div>
  );
}
