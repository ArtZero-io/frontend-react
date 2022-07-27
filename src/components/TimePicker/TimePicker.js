import { useState } from "react";
import { Stack, Text } from "@chakra-ui/react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/entry.nostyle";
// import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

export const TimePicker = () => {
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <Stack id="custom-time-picker">
      <Text fontSize="lg" ml={1} mb="10px">
        Start time - End time
      </Text>
      <DateTimeRangePicker onChange={onChange} value={value} locale="en-EN" />
    </Stack>
  );
};
