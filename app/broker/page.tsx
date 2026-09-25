import { redirect } from "next/navigation";

export default function LegacyBrokerRedirect() {
  redirect("/portal/broker");
}
