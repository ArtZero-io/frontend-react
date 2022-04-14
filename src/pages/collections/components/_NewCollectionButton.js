import { 
    Button, 
    Modal,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure, } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NewCollectionButton = () => {

    const OverlayOne = () => (
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    )

    const buttonLinks = [
        { label: 'Simple Mode - ERC721', href: '/new-collection/1' },
        { label: 'Advanced Mode - ERC721', href: '/new-collection/2'}
      ]

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Please choose a type of collection
                    <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            {buttonLinks.map((link, index) => (
                                <Button
                                    index={index}
                                    size="sm"
                                >
                                    <Link to={link.href}>{link.label}</Link>
                                </Button>
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button
                size="sm"
                onClick={() => {
                setOverlay(<OverlayOne />)
                onOpen()
                }}
            >
                Add New Collection
            </Button>
        </>
    )
}

export default NewCollectionButton
  