/**
 * main namespace constants
 */
export const NamespaceConstants = {
  appointment: "appointment",
} as const;

export const AppointmentEventConstant = {
  namespace: NamespaceConstants.appointment,
  message: `message.${NamespaceConstants.appointment}`,
} as const;
