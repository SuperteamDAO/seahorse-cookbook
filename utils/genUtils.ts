const getTruncatedPubkey = (pubkey: string) => {
	const strlen = pubkey.length;

	return pubkey.substring(0, 4) + "..." + pubkey.substring(strlen - 4);
};

export default getTruncatedPubkey;
