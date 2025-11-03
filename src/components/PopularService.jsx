import Image from "next/image";
import React from "react";
import popularcateIcon from "../../public/popularcate.svg";
import delivery from "../../public/delivery-bike.png";
import virtual from "../../public/virtual-class.png";
import cosmetics from "../../public/cosmetics.png";
import man from "../../public/man.png";
import graphic from "../../public/illustration.png";
import banner from "../../public/banner.png";
import technical from "../../public/technical-support.png";
import truck from "../../public/moving-truck.png";
import mop from "../../public/mop.png";
import plumber from "../../public/plumber.png";
import CateCard from "./CateCard";


const data = [
  {
    id: 1,
    cateName: "Home Cleaning & Laundry",
    icon: mop,
  },
  {
    id: 2,
    cateName: "Plumbing & Electrical Repairs",
    icon: plumber,
  },
  {
    id: 3,
    cateName: "Delivery & Errands",
    icon: delivery,
  },
  {
    id: 4,
    cateName: "Tutoring & Lessons",
    icon: virtual,
  },
  {
    id: 5,
    cateName: "Beauty & Grooming",
    icon: cosmetics,
  },
  {
    id: 6,
    cateName: "Handyman & Furniture Assembly",
    icon: man,
  },
  {
    id: 7,
    cateName: "Graphic Design & Digital Services",
    icon: graphic,
  },
  {
    id: 8,
    cateName: "Event & Catering Services",
    icon: banner,
  },
  {
    id: 9,
    cateName: "IT & Technical Support",
    icon: technical,
  },
  {
    id: 10,
    cateName: "Moving & Transport Help",
    icon: truck,
  },
];


const PopularService = () => {

  return (
 <section className="max-w-[1240px] mx-auto px-4">
      <div className="flex flex-col gap-16">
        <div className="mt-16 md:mt-44 flex flex-col gap-5 md:flex-row justify-between md:items-center">
          {/* top header */}
          <div>
            <div className="flex items-center gap-4 ">
              <Image
                src={popularcateIcon}
                alt="Popular Category "
                height={24}
              />
              <p className="font-semibold text-md md:text-xl text-color pb-3">
                CATEGORIES
              </p>
            </div>
            {/* <h3 className="font-semibold text-2xl md:text-4xl flex flex-col gap-6">
              Categories
            </h3> */}
          </div>
         

          {/* Cards */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <CateCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularService;