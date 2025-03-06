import { Input } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Button,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useRef, useState } from "react";

function TodoCard() {
  const [inputValue, setInputValue] = useState(""); // Input nilai untuk todo
  const [wishListItems, setWishListItems] = useState([]); // Daftar aktivitas
  const [whatsAppNumber, setWhatsAppNumber] = useState(""); // Nomor WhatsApp

  function addWishList() {
    if (inputValue.trim() !== "") {
      setWishListItems([...wishListItems, inputValue]);
      setInputValue(""); // Reset input field
    }
  }

  function sendToWhatsApp() {
    if (!whatsAppNumber) {
      alert("Please enter a valid WhatsApp number.");
      return;
    }

    const message = wishListItems.join("\n"); // Gabungkan semua item menjadi satu pesan
    const encodedMessage = encodeURIComponent(message); // URL encode pesan
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    // Membuka WhatsApp dengan pesan yang sudah di-encode
    window.open(url, "_blank");
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-2xl">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          isRequired
          className="w-full md:w-80"
          label="Add list Todo"
          type="input"
        />
        <Button onPress={addWishList} className="w-full md:w-auto">
          Add
        </Button>
      </div>

      <div className="w-full flex-col gap-4 items-center justify-center mt-4">
        <Table aria-label="Example empty table" className="p-8 w-full">
          <TableHeader>
            <TableColumn className="text-center">No.</TableColumn>
            <TableColumn className="text-center">
              YOUR LIST ACTIVITY
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No List Activity"}>
            {wishListItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-4 justify-center items-center mt-4 w-full max-w-2xl">
        <Input
          value={whatsAppNumber}
          onChange={(e) => setWhatsAppNumber(e.target.value)}
          isRequired
          className="w-full md:w-80"
          label="Enter WhatsApp Number (Include Country Code)"
          type="text"
        />
        <Button onPress={sendToWhatsApp} className="w-full md:w-auto">
          Save & Send to WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default TodoCard;
