pragma solidity ^0.5.0;

contract Datreon {
    string public name = "Datreon";

    // Store posts
    mapping(uint256 => Image) public images;
    uint256 public imageCount = 0;

    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );
    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    // create posts
    function uploadImage(string memory _imgHash, string memory _description)
        public
    {
        // Image should have an ipfs hash
        require(bytes(_imgHash).length > 0);

        // Image should have a description
        require(bytes(_description).length > 0);

        // Make sure the person who is sending this is not a blank sender
        require(msg.sender != address(0x0));

        imageCount++;

        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );

        emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
    }

    // tip posts
    function tipImageOwner(uint256 _id) payable public {
      // check if id is valid
        require(_id > 0 && _id <= imageCount);

        //get image and author
        Image memory _image = images[_id];
        address payable _author = _image.author;
        //transfer funds
        address(_author).transfer(msg.value);
        //Update the existing record
        _image.tipAmount = _image.tipAmount + msg.value;
        images[_id] = _image;

        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author
        );
    }
}
