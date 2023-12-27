"use client";
import { Separator } from "@/components/ui/separator";
import { Comment, Note, User } from "@prisma/client";
import React from "react";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HeartIcon, MessageCircle } from "lucide-react";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type ItemProps = Note & {
  user: User | null;
  comment: Comment[] | null;
};

const RecentNote = ({ items }: { items: ItemProps[] | null }) => {
  return (
    <section className="md:py-12">
      <div className="md:flex md:items-baseline md:justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl">Recent Notes</h1>
        <Link
          href={"/notes"}
          className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
        >
          Go to notes collection <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <Separator className="my-6" />
      <div className="relative px-3">
        <div className=" pb-8 relative">
          <Carousel
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="sm:px-5"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {items?.map((item) => (
              <div key={item.id} className="w-full grid gap-2">
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-muted rounded overflow-hidden shadow-md border"
                >
                  <Image
                    src={item.url || "/thumbnail.jpg"}
                    alt="thumbnail"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover object-center transition-all hover:scale-105"
                    priority
                  />
                </AspectRatio>
                <div className="flex flex-wrap gap-y-2 pt-2 items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={item.user?.image || "/image1.jpg"}
                        alt="avatar"
                      />
                    </Avatar>
                    <h2>{item.user?.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <p>
                      {item.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center">
                      <HeartIcon className="w-4 h-4 mr-1" />
                      15
                    </div>
                    <Link
                      href={`/notes/${item?.slug}#comments`}
                      className="flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />{" "}
                      {item?.comment?.length}
                    </Link>
                  </div>
                </div>
                <Separator className="mt-2 mb-5" />
                <Link href={`/notes/${item.slug}`} className="text-xl truncate">
                  {item.title || "Untitled Note"}
                </Link>
                <p className="text-sm text-muted-foreground">{item.excerpt}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default RecentNote;
