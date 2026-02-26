/**
 * Partners Section Component with Infinite Marquee
 *
 * Vercel/Stripe-style infinite scrolling marquee animation
 * featuring partner logos with grayscale-to-color effect.
 */

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PARTNERS, SECTION_IDS } from "../constants";
import "@/components/animations/Marquee.css";

export function PartnersSection() {
	const t = useTranslations("partners");

	// Duplicate partners array for seamless infinite loop
	// We need at least 2 sets for smooth scrolling
	const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

	return (
		<section
			id={SECTION_IDS.PARTNERS}
			className="relative py-20 bg-[var(--surface)] overflow-hidden"
		>
			{/* Top border */}
			<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
						{t("trustedBy")}
					</h2>
					<p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
						{t("subtitle")}
					</p>
				</div>
			</div>

			{/* Marquee Container */}
			<div className="marquee-container py-8">
				<div className="marquee-track">
					{duplicatedPartners.map((partner, index) => (
						<div
							key={`${partner.id}-${index}`}
							className="marquee-item group"
							title={partner.name}
						>
							<Image
								width={140}
								height={56}
								src={partner.logo}
								alt={partner.name}
								className="marquee-logo"
								style={{
									maxWidth: "140px",
									maxHeight: "40px",
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Bottom border */}
			<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
		</section>
	);
}

export default PartnersSection;
