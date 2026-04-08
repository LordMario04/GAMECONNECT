import * as React from "react"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"

export function CarouselSpacing() {
  const [juegos, setJuegos] = useState([])

  useEffect(() => {
    async function fetchJuegos() {
      const { data, error } = await supabase
        .from("products")
        .select("id, name")

      if (error) {
        console.error("Error al obtener juegos:", error)
      } else {
        setJuegos(data)
      }
    }

    fetchJuegos()
  }, [])

  return (
    <div className="flex justify-center w-full overflow-x-hidden px-4">
      <Carousel className="w-full max-w-7xl">
        <CarouselContent className="ml-0 flex gap-3">
          {juegos.length > 0 ? (
            juegos.map((juego) => (
              <CarouselItem
                key={juego.id}
                className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-base font-semibold break-words">
                      {juego.name}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <p className="text-center w-full py-8 text-gray-500">
              Cargando juegos...
            </p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
