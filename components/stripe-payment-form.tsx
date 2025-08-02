"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { formatAmountForDisplay } from "@/lib/stripe-client"

interface StripePaymentFormProps {
  clientSecret: string
  amount: number
  onSuccess: () => void
}

export function StripePaymentForm({ clientSecret, amount, onSuccess }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          onSuccess()
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          // No message needed here, the form will handle it
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe, clientSecret, onSuccess])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.")
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" onChange={(e) => setEmail(e.value.email)} />
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} className="mt-4" />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full mt-4">
        <span id="button-text">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            `Pay now (${formatAmountForDisplay(amount, "usd")})`
          )}
        </span>
      </Button>
      {message && (
        <div id="payment-message" className="text-red-500 text-sm mt-2 text-center">
          {message}
        </div>
      )}
    </form>
  )
}
