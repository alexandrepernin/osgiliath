'use client';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { Pages } from 'constants/pages';

const NotFound = (): JSX.Element => (
  <Flex minH="100vh" align="center" justify="center" bg="gray.50">
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" as="h2" size="2xl" color="gray.700">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color="gray.500" mb={6}>
        The page you are looking for does not seem to exist
      </Text>

      <Button
        as="a"
        bg="gray.700"
        color="white"
        _hover={{
          bg: 'gray.600',
        }}
        href={Pages.DASHBOARD}
      >
        Go to Home
      </Button>
    </Box>
  </Flex>
);

export default NotFound;
