import { Minus, Phone, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";
import { orderModes, restaurantInfo, type OrderModeId } from "@/features/menu/data";
import { formatCurrency, getCartCount, getCartSubtotal, getOrderModeById, serializeSelections, type CartItem, type CustomerDetails } from "@/features/menu/lib/menu";
import { cn } from "@/shared/lib/utils";

interface CartPanelProps {
  cartItems: CartItem[];
  customer: CustomerDetails;
  orderModeId: OrderModeId;
  canSendOrder: boolean;
  whatsappUrl: string;
  onOrderModeChange: (modeId: OrderModeId) => void;
  onCustomerChange: (field: keyof CustomerDetails, value: string) => void;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onCopySummary: () => void;
}

const CartPanel = ({
  cartItems,
  customer,
  orderModeId,
  canSendOrder,
  whatsappUrl,
  onOrderModeChange,
  onCustomerChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCopySummary,
}: CartPanelProps) => {
  const currentOrderMode = getOrderModeById(orderModeId);
  const subtotal = getCartSubtotal(cartItems);
  const totalUnits = getCartCount(cartItems);

  return (
    <Card className="sticky top-24 overflow-hidden rounded-[28px] border-border/60 bg-card/90 shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
      <CardHeader className="border-b border-border/60 bg-background/30">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gold">Pedido</p>
            <CardTitle className="font-display text-3xl">Carrito activo</CardTitle>
          </div>
          <div className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">
            {totalUnits} uds
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Revisa tu seleccion, ajusta cantidades y completa tus datos.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Modo de pedido</p>
            <span className="text-xs text-muted-foreground">ETA {currentOrderMode.eta}</span>
          </div>

          <div className="grid gap-3">
            {orderModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onOrderModeChange(mode.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-colors",
                  orderModeId === mode.id
                    ? "border-gold/60 bg-gold/10"
                    : "border-border/60 bg-background/35 hover:border-gold/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-semibold">{mode.name}</span>
                  <span className="text-sm text-gold">{mode.note}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{mode.description}</p>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Tu seleccion</p>
            {cartItems.length > 0 ? (
              <button type="button" onClick={onClearCart} className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">
                Vaciar
              </button>
            ) : null}
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/60 bg-background/20 p-6 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-4 font-display text-2xl">Sin productos todavia</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Anade tus favoritos para empezar el pedido.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-3xl border border-border/60 bg-background/25 p-4">
                  <div className="flex items-start gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                        width={160}
                        height={160}
                      />
                    ) : (
                      <div className="flex h-20 w-20 shrink-0 flex-col justify-between rounded-2xl border border-border/60 bg-[linear-gradient(160deg,#17130f,#2b241c)] p-2 text-white">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/70">Sin foto</span>
                        <span className="font-display text-sm leading-none">{item.name}</span>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-xl font-semibold">{item.name}</p>
                          <p className="text-sm text-gold">{formatCurrency(item.unitPrice)} por unidad</p>
                        </div>
                        <button type="button" onClick={() => onRemoveItem(item.id)} className="text-muted-foreground transition-colors hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {item.selections.length > 0 ? (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{serializeSelections(item.selections)}</p>
                      ) : null}
                      {item.notes ? <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Nota: {item.notes}</p> : null}

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Button type="button" variant="outline" size="icon" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                          <Button type="button" variant="outline" size="icon" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-display text-2xl font-semibold text-gold">{formatCurrency(item.totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Datos del cliente</p>
          <div className="space-y-2">
            <Label htmlFor="customer-name">Nombre</Label>
            <Input
              id="customer-name"
              placeholder="Tu nombre"
              value={customer.name}
              onChange={(event) => onCustomerChange("name", event.target.value)}
              className="rounded-2xl border-border/60 bg-background/35"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-phone">Telefono</Label>
            <Input
              id="customer-phone"
              placeholder="Tu telefono"
              value={customer.phone}
              onChange={(event) => onCustomerChange("phone", event.target.value)}
              className="rounded-2xl border-border/60 bg-background/35"
            />
          </div>
          {orderModeId === "delivery" ? (
            <div className="space-y-2">
              <Label htmlFor="customer-address">Direccion de entrega</Label>
              <Input
                id="customer-address"
                placeholder="Calle, numero, portal..."
                value={customer.address}
                onChange={(event) => onCustomerChange("address", event.target.value)}
                className="rounded-2xl border-border/60 bg-background/35"
              />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="customer-notes">Notas generales</Label>
            <Textarea
              id="customer-notes"
              placeholder="Indicaciones para entrega, alergias o detalles del pedido..."
              value={customer.notes}
              onChange={(event) => onCustomerChange("notes", event.target.value)}
              className="min-h-24 rounded-2xl border-border/60 bg-background/35"
            />
          </div>
        </div>

        <Separator />

        <div className="rounded-3xl border border-gold/20 bg-gold/10 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm uppercase tracking-[0.24em] text-gold">Subtotal estimado</span>
            <span className="font-display text-3xl font-bold text-gold">{formatCurrency(subtotal)}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {currentOrderMode.description} | Tiempo estimado {currentOrderMode.eta}
          </p>
        </div>

        <div className="space-y-3">
          {canSendOrder ? (
            <Button asChild className="gradient-gold h-12 w-full rounded-xl text-base text-gold-foreground">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Enviar pedido por WhatsApp
              </a>
            </Button>
          ) : (
            <Button disabled className="h-12 w-full rounded-xl text-base">
              Completa nombre y telefono para continuar
            </Button>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="button" variant="outline" className="h-11 rounded-xl border-border/60" onClick={onCopySummary}>
              Copiar resumen
            </Button>
            <Button asChild variant="ghost" className="h-11 rounded-xl border border-border/60">
              <a href={`tel:${restaurantInfo.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/20 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Cobertura actual</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {restaurantInfo.serviceAreas.join(", ")}. Reparto habitual en estas zonas segun disponibilidad y horario.
          </p>
          <div className="mt-4">
            <Button asChild variant="link" className="h-auto p-0 text-gold">
              <Link to={{ pathname: "/", hash: "#contacto" }}>Ver informacion</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartPanel;
