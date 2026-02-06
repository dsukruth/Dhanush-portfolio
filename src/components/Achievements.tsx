import React from 'react';
import { Award } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const achievements = [
  {
    id: 1,
    image: '/placeholder.svg',
    caption: 'AI in Food Insecurity Case Competition - Winner',
    date: '2025'
  },
  {
    id: 2,
    image: '/placeholder.svg',
    caption: 'Campus AI Platform Launch - 50K+ Daily Users',
    date: '2025'
  },
  {
    id: 3,
    image: '/placeholder.svg',
    caption: 'Leadership Excellence Award',
    date: '2024'
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-thin text-gray-900 mb-6 tracking-tight">
            Achievements
          </h2>
          <div className="w-16 h-0.5 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Celebrating milestones and recognitions throughout my professional journey
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {achievements.map((achievement) => (
                <CarouselItem key={achievement.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <div className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={achievement.image}
                          alt={achievement.caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 bg-white">
                        <div className="flex items-start gap-3 mb-2">
                          <Award size={20} className="text-gray-900 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-gray-900 font-medium leading-snug">
                              {achievement.caption}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">{achievement.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
