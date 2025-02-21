import { FC } from "react";

type Props = {
  partners: {
    image: string;
    href: string;
    name: string;
  }[];
};

const PartnersGrid: FC<Props> = ({ partners }) => {
  return (
    <div className="cols-3 my-10 grid grid-cols-2 gap-5 md:grid-cols-3">
      {partners.map((partner, idx) => (
        <a
          href={partner.href}
          key={idx}
          className="flex items-center rounded-sm bg-gray-50 p-4 transition-colors hover:bg-gray-200"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="max-h-28 object-contain"
            alt={`Logo ${partner.name}`}
            src={`/logos/${partner.image}`}
            width={200}
            height={200}
          />
        </a>
      ))}
    </div>
  );
};

export default PartnersGrid;
