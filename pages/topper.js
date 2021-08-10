import { Container, Heading, Button, Input, HStack } from "@chakra-ui/react"
import { useState } from "react"

export default function topper() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const urlSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
  }
  
  return (
    <>
      <Container maxW="container.sm">
        <Heading as="h1" size="lg" mt="4">
          Topperlearning PDF Downloader
        </Heading>
        <Heading as="h2" size="xs" mt="2">
          Paste the Topperlearning url to download the PDF in it
        </Heading>
      
        <HStack as="form" onSubmit={e => urlSubmit(e)} mt="6">
          <Input disabled={isSubmitting}/>
          <Button variant="solid" colorScheme="blue" type="submit" isLoading={isSubmitting}>Submit</Button>
        </HStack>

      </Container>
    </>
  )
}
