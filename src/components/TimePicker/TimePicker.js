import { useState } from "react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { Stack, Text } from "@chakra-ui/react";

export const TimePicker = () => {
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <Stack>
      <Text>Start time - End time</Text>
      <DateTimeRangePicker onChange={onChange} value={value} locale="en-EN" />
    </Stack>
  );
};
