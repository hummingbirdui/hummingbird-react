import GradientBorderBox from "@/components/common/GradientBorderBox";
import type { Feature } from "@/data/landing/features";

interface FeatureCardProps {
  feature: Feature;
}

const cardStyleMap: Record<
  string,
  {
    iconStyle: string;
    iconWrapperStyle: string;
    overlay: string;
  }
> = {
  primary: {
    iconStyle: "text-primary-dark",
    iconWrapperStyle: "border-primary-dark bg-primary-lighter",
    overlay: "/images/features/primary.png",
  },
  secondary: {
    iconStyle: "text-secondary-dark",
    iconWrapperStyle: "border-secondary-dark bg-secondary-lighter",
    overlay: "/images/features/secondary.png",
  },
  error: {
    iconStyle: "text-danger-dark",
    iconWrapperStyle: "border-danger-dark bg-danger-lighter",
    overlay: "/images/features/error.png",
  },
  warning: {
    iconStyle: "text-warning-dark",
    iconWrapperStyle: "border-warning-dark bg-warning-lighter",
    overlay: "/images/features/warning.png",
  },
  info: {
    iconStyle: "text-info-dark",
    iconWrapperStyle: "border-info-dark bg-info-lighter",
    overlay: "/images/features/info.png",
  },
  success: {
    iconStyle: "text-success-dark",
    iconWrapperStyle: "border-success-dark bg-success-lighter",
    overlay: "/images/features/success.png",
  },
};

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const { icon: Icon, color, title, description } = feature;

  const { iconStyle, iconWrapperStyle, overlay } = cardStyleMap[color];

  return (
    <GradientBorderBox color={color}>
      <div
        className="relative h-full bg-subtle bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${overlay})` }}
      >
        <Icon
          className={`absolute top-2.5 right-2.5 size-16 opacity-10 ${iconStyle}`}
        />

        <div
          className={`mb-7 flex size-10 items-center justify-center rounded-full border ${iconWrapperStyle}`}
        >
          <Icon className={iconStyle} />
        </div>

        <h3 className="mb-4 text-base font-semibold">{title}</h3>

        <p className="text-sm text-muted">{description}</p>
      </div>
    </GradientBorderBox>
  );
};

export default FeatureCard;
