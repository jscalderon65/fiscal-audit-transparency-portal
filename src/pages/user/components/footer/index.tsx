import { Building2 } from "lucide-react";
import { PALETTE } from "../../../../constants/theme";

export interface IFooterProps {
  year: number | string;
  portalName: string;
  residentialName: string;
}

export const Footer: React.FC<IFooterProps> = ({
  year,
  portalName,
  residentialName,
}) => {
  return (
    <footer
      style={{
        backgroundColor: PALETTE.neutral[950],
        paddingTop: 40,
        paddingBottom: 40,
        textAlign: "center",
        borderTop: `1px solid ${PALETTE.neutral[900]}`,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <Building2
          className="w-8 h-8"
          style={{ color: PALETTE.neutral[700] }}
        />
        <p
          className="text-sm md:text-base font-medium"
          style={{ color: PALETTE.neutral[400] }}
        >
          &copy; {year} {portalName} - {residentialName}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
