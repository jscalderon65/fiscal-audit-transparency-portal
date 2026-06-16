import React from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Typography from "../../ui/Typography";
import Badge from "../../ui/Badge";
import Card from "../../ui/Card";
import { Send, User } from "lucide-react";

const Showcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-[1100px] mx-auto grid gap-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Botones</h2>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Formularios
          </h2>
          <div className="max-w-[600px]">
            <Input label="Nombre" placeholder="Ej. Carlos" />
            <div className="h-3" />
            <Input label="Usuario" placeholder="usuario" leftIcon={User} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Cards & Badges
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Card hover>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-900">Card title</h3>
                  <p className="text-slate-500">
                    Descripción breve de la card.
                  </p>
                </div>
                <Badge variant="success">Completado</Badge>
              </div>
            </Card>
            <Card>
              <div>
                <h3 className="font-bold text-slate-900">Otra card</h3>
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
