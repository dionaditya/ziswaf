import React from "react";
import { Input, Textarea } from "@/app/container/components/index";
import SimpleSelect from '@/app/container/components/SelectMUI';
import { GoodsCategories, GoodsStatus } from '@/domain/entities/AllOptions';
import GridContainer from '@/app/container/commons/Grid/GridContainer';
import GridItem from '@/app/container/commons/Grid/GridItem';
import { Box, makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import Card from "@/app/container/commons/Card/Card.js";
import CardHeader from "@/app/container/commons/Card/CardHeader.js";
import CardBody from "@/app/container/commons/Card/CardBody.js";
import InputMask from '@/app/container/components/InputMask';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      color: "#323C47",
      fontSize: 12,
      fontWeight: 800,
      marginTop: theme.spacing(2),
    }
  }),
);

const JenisBarang = ({ controller, onChange }) => {
  const classes = useStyles()
  const {
    category_id,
    description,
    quantity,
    value,
    status
  } = controller.DonationInfo.goods
  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h3 className="white-text">Donasi Bentuk Barang</h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <form>
                    <Box display="flex" flexDirection="column">
                      <label className={classes.label}>
                        Jenis Barang
                      </label>
                      <SimpleSelect
                        onChange={onChange}
                        value={category_id}
                        async={false}
                        name="category_id"
                        data={GoodsCategories}
                        label="Jenis Barang"
                      />
                      <label className={classes.label}>
                        Deskripsi Barang
                      </label>
                      <Textarea
                        className="text-area"
                        id="description"
                        name="description"
                        placeholder="Deskripsi Barang"
                        value={description}
                        onChange={onChange}
                        style={{
                          minHeight: "100px"
                        }}
                      />
                      <label className={classes.label}>
                        Jumlah Barang
                      </label>
                      <TextField
                        id="quantity"
                        name="quantity"
                        type="number"
                        variant="outlined"
                        style={{ width: '100%' }}
                        placeholder="Jumlah Barang"
                        value={quantity}
                        onChange={onChange}
                      />
                      <label className={classes.label}>
                        Estimasi Nilai Barang
                      </label>
                        <InputMask
                        defaultValue={value}
                        placeholder="Rp. 0"
                        type="text"
                        onChange={(value) => {
                          const e = {
                            target: {
                              name: "value",
                              value: value,
                            },
                          };
                          onChange(e);
                        }}
                      />
                
                      <label className={classes.label}>
                        Status Barang
                      </label>
                      <SimpleSelect
                        async={false}
                        onChange={onChange}
                        value={status}
                        data={GoodsStatus}
                        name="status"
                        label="Status Barang"
                      />
                    </Box>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

export default JenisBarang;