import React from "react";
import { useParams } from "react-router-dom";

const gigs = [
  { id: "1", title: "Create a Stunning Logo", freelancer: "Rohit Sharma", description: "A high-quality logo design tailored to your brand identity.", price: "₹2,500", rating: 4.8 },
  { id: "2", title: "Build a Responsive Website", freelancer: "Ayesha Khan", description: "A fully responsive website built with modern UI/UX principles.", price: "₹10,000", rating: 5.0 },
  { id: "3", title: "Social Media Marketing (Instagram, LinkedIn)", freelancer: "Suresh Iyer", description: "Strategic social media marketing to boost engagement.", price: "₹5,000", rating: 4.7 }
];

export default function GigDetails() {
  const { id } = useParams();
  
  const gig = gigs.find((g) => g.id === id);

  if (!gig) {
    return <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">❌ Gig not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold">{gig.title}</h1>
      <p className="text-gray-500 dark:text-gray-400">By {gig.freelancer}</p>
      <p className="mt-4">{gig.description}</p>
      <p className="mt-2 text-lg font-semibold">Price: {gig.price}</p>
      <p className="mt-2 text-yellow-500">⭐ {gig.rating}</p>
    </div>
  );
}
