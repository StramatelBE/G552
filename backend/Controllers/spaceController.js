const { execSync } = require('child_process');
const User = require("../Models/userModel");

class SpaceController {

  getSpace = async (req, res) => {

    function convertSizeToBytes(size) {
      const multipliers = {
        'K': 1024,
        'M': 1024 * 1024,
        'G': 1024 * 1024 * 1024,
        'T': 1024 * 1024 * 1024 * 1024
      };
      const number = parseFloat(size);
      const unit = size.toUpperCase().replace(/[0-9.]/g, '');
      console.log(number * multipliers[unit]);
      return number * multipliers[unit];
    }

    try {
      const newUser = User.getInstance();
      const users = await newUser.getAll();
      const dirs = users.map(user => `../../server/frontend/public/medias/${user.username}`);

      let totalUsedSpace = 0;
      const spaceUsedByDirs = {};
      const path = require('path');

      for (const dir of dirs) {
        const command = `du -sh "${dir}"`;
        const output = execSync(command).toString().trim();
        const [size, fullPath] = output.split('\t');
        const folderName = path.basename(fullPath);
        const convertedSize = convertSizeToBytes(size);
        spaceUsedByDirs[folderName] = convertedSize;
        totalUsedSpace += convertedSize;
      }

      const totalDiskSpaceUsed = execSync('df -h / | tail -n 1 | awk \'{print $3}\'').toString().trim();
      const totalDiskSpaceAvailable = execSync('df -h / | tail -n 1 | awk \'{print $4}\'').toString().trim();

      spaceUsedByDirs['Autres'] = convertSizeToBytes(totalDiskSpaceUsed);
      spaceUsedByDirs['Total'] = convertSizeToBytes(totalDiskSpaceAvailable);

      res.status(200).json(spaceUsedByDirs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  };

}

module.exports = SpaceController;