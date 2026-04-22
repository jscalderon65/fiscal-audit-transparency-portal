import React from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Typography from "../../ui/Typography";
import Badge from "../../ui/Badge";
import Card from "../../ui/Card";
import { PALETTE } from "../../constants/theme";
import { Send, User } from "lucide-react";

const Showcase: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: PALETTE.background.page,
        padding: 40,
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 24 }}
      >
        <section>
          <h2
            style={{ color: PALETTE.text.default }}
            className="text-2xl font-bold mb-4"
          >
            Botones
          </h2>
          <div className="flex gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="primary" leftIcon={Send}>
              Con icono
            </Button>
          </div>
        </section>

        <section>
          <h2
            style={{ color: PALETTE.text.default }}
            className="text-2xl font-bold mb-4"
          >
            Formularios
          </h2>
          <div style={{ maxWidth: 600 }}>
            <Input label="Nombre" placeholder="Ej. Carlos" />
            <div style={{ height: 12 }} />
            <Input label="Usuario" placeholder="usuario" leftIcon={User} />
          </div>
        </section>

        <section>
          <h2
            style={{ color: PALETTE.text.default }}
            className="text-2xl font-bold mb-4"
          >
            Tipografía
          </h2>
          <Typography.H1>H1 - Título</Typography.H1>
          <Typography.H2>H2 - Sección</Typography.H2>
          <Typography.Text>
            Texto de ejemplo para el cuerpo del contenido.
          </Typography.Text>
          <Typography.Small>Texto pequeño (muted)</Typography.Small>
        </section>

        <section>
          <h2
            style={{ color: PALETTE.text.default }}
            className="text-2xl font-bold mb-4"
          >
            Cards & Badges
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Card hover>
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    style={{ color: PALETTE.text.default }}
                    className="font-bold"
                  >
                    Card title
                  </h3>
                  <p style={{ color: PALETTE.text.muted }}>
                    Descripción breve de la card.
                  </p>
                </div>
                <Badge variant="success">Completado</Badge>
              </div>
            </Card>
            <Card>
              <div>
                <h3
                  style={{ color: PALETTE.text.default }}
                  className="font-bold"
                >
                  Otra card
                </h3>
                <Badge variant="pending">Pendiente</Badge>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Showcase;
