import Head from 'next/head'
import Link from 'next/link'
import { Container, Heading, Stack, Button } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <Head>
        <title>Vedantu/Topperlearning PDF Downloader</title>
        <meta name="description" content="Download Vedantu/Topperlearning resources without having to signup fot them" />
      </Head>

      <Container maxW="container.sm">
        <Heading as="h1" size="lg" mt="4">
          Vedantu/Topperlearning PDF Downloader
        </Heading>
        <Heading as="h2" size="xs" mt="2">
          Download Vedantu/Topperlearning resources without having to signup for them
        </Heading>

        <Stack direction="row" spacing={4} align="center" mt="4">
          <Link passHref href="/vedantu">
            <Button colorScheme="orange" variant="solid" as="a">
              Vedantu
            </Button>
          </Link>
          <Link passHref href="/topper">
            <Button colorScheme="blue" variant="solid" as="a">
              Topper
            </Button>
          </Link>
        </Stack>

      </Container>

    </>
  )
}
