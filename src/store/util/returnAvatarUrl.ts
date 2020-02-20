const returnAvatarUrl = (avatar?: string | File) => {
  if (typeof avatar === 'string' || !avatar) {
    return avatar;
  } else {
    return avatar.preview;
  }
};

export default returnAvatarUrl;
