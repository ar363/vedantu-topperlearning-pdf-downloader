import { Container, Heading, Button, Input, HStack, Text, Link } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"

export default function Topper() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [foundUrls, setFoundUrls] = useState([])

  const urlSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const url = e.target.url.value;

    if (url.match(/^http(s?)\:\/\/www\.topperlearning\.com(.*?)$/) === null) {
      setIsSubmitting(false)
      setFormError('Entered URL does not begin with https://www.topperlearning.com')
      return null
    }
    
    const res = await axios.post('/api/topper', { url })
    if (res.data.err) {
      setIsSubmitting(false)
      setFormError('An unknown error occoured. Please try again later or with another url')
      return null
    }

    if (res.data.pdfs === []) {
      setIsSubmitting(false)
      setFormError('No PDFs found in this page')
      return null
    }

    setFormError('')
    setIsSubmitting(false)
    setFoundUrls(res.data.pdfs)

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
          <Input disabled={isSubmitting} name="url" type="url" isRequired/>
          <Button variant="solid" colorScheme="blue" type="submit" isLoading={isSubmitting}>Submit</Button>
        </HStack>

        { formError !== '' && <Text color="red.500" mt="2" fontWeight="bold">Error: {formError}</Text> }

        { foundUrls.length !== 0 && 
          <>
            <Heading as="h3" size="xl" mt="6">Found {foundUrls.length} PDFs in this page</Heading>
            <Heading as="h4" size="sm" mt="1" mb="4">Click on them below to view and download them</Heading>
          </> 
        }

        {
          foundUrls.map((url, index) => (
            <Text key={index} mb="2">
              <Link href={url} isExternal color="blue.500">{url.split('/')[url.split('/').length - 1]}</Link>
            </Text>
          ))
        }

      </Container>
    </>
  )
}
