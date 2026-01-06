'use client';

import { Project } from "@/types/project";
import { useState } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

// Sample project data - replace with your actual projects
const projectsData: Project[] = [
  // Junk Removal Projects
  {
    id: 1,
    title: "Residential Cleanout",
    category: "junk-removal",
    media: [
      { type: "image", url: "/images/projects/junk-removal-1.jpg" },
      { type: "image", url: "/images/projects/junk-removal-2.jpg" },
    ],
    description: "Complete property cleanout and junk removal service"
  },
  {
    id: 2,
    title: "Construction Debris Removal",
    category: "junk-removal",
    media: [
      { type: "image", url: "/images/projects/junk-removal-3.jpg" },
    ],
  },
  // Bathroom Projects
  {
    id: 3,
    title: "Modern Bathroom Remodel",
    category: "bathroom",
    media: [
      { type: "image", url: "/images/projects/bathroom-1.jpg" },
      { type: "image", url: "/images/projects/bathroom-2.jpg" },
      { type: "image", url: "/images/projects/bathroom-3.jpg" },
    ],
    description: "Complete bathroom renovation with modern fixtures"
  },
  {
    id: 4,
    title: "Luxury Master Bath",
    category: "bathroom",
    media: [
      { type: "image", url: "/images/projects/bathroom-4.jpg" },
    ],
  },
  // Kitchen Projects
  {
    id: 5,
    title: "Contemporary Kitchen Renovation",
    category: "kitchen",
    media: [
      { type: "image", url: "/images/projects/kitchen-1.jpg" },
      { type: "image", url: "/images/projects/kitchen-2.jpg" },
    ],
    description: "Full kitchen remodel with custom cabinets"
  },
  {
    id: 6,
    title: "Modern Kitchen Design",
    category: "kitchen",
    media: [
      { type: "image", url: "/images/projects/kitchen-3.jpg" },
    ],
  },
  // Flooring Projects
  {
    id: 7,
    title: "Hardwood Floor Installation",
    category: "flooring",
    media: [
      { type: "image", url: "/images/projects/flooring-1.jpg" },
      { type: "image", url: "/images/projects/flooring-2.jpg" },
    ],
    description: "Premium hardwood flooring throughout the home"
  },
  {
    id: 8,
    title: "Tile Floor Design",
    category: "flooring",
    media: [
      { type: "image", url: "/images/projects/flooring-3.jpg" },
    ],
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: "🏗️" },
  { id: "junk-removal", label: "Junk Removal", icon: "🚛" },
  { id: "bathroom", label: "Bathroom", icon: "🚿" },
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "flooring", label: "Flooring", icon: "🪵" },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);

  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-light relative overflow-hidden">
      <div className="container">
        <SectionTitle
          title="Our Completed Work"
          paragraph="Take a look at some of our recent projects and transformations."
          center
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white text-body-color hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-two hover:shadow-one transition-all duration-300">
                {/* Project Media Grid */}
                <div className={`grid gap-1 ${project.media.length === 1 ? 'grid-cols-1' : project.media.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                  {project.media.slice(0, 4).map((media, index) => (
                    <div
                      key={index}
                      className={`relative ${project.media.length === 3 && index === 0 ? 'col-span-2' : ''} ${project.media.length > 4 && index === 3 ? 'relative' : ''}`}
                      style={{ aspectRatio: project.media.length === 1 ? '16/9' : '1/1' }}
                    >
                      {media.type === "image" ? (
                        <>
                          <Image
                            src={media.url}
                            alt={project.title}
                            fill
                            className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                            onClick={() => setSelectedMedia({ url: media.url, type: "image" })}
                          />
                          {project.media.length > 4 && index === 3 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                              onClick={() => setSelectedMedia({ url: media.url, type: "image" })}>
                              <span className="text-white text-3xl font-bold">
                                +{project.media.length - 4}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="relative w-full h-full">
                          <video
                            src={media.url}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedMedia({ url: media.url, type: "video" })}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                            onClick={() => setSelectedMedia({ url: media.url, type: "video" })}>
                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-body-color">
                      {project.description}
                    </p>
                  )}
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {categories.find(c => c.id === project.category)?.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-body-color">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/60 rounded-full w-12 h-12 flex items-center justify-center text-3xl hover:bg-black/80 transition z-[10000]"
            onClick={() => setSelectedMedia(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "image" ? (
              <Image
                src={selectedMedia.url}
                alt="Project preview"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
