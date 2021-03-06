import React, { Fragment, useEffect } from 'react'
import { Statistic, Row, Col, Button, Card } from 'antd';
import { UserOutlined, UserAddOutlined, UserDeleteOutlined, CarOutlined, DingtalkOutlined, WalletOutlined, EditOutlined, ExclamationCircleOutlined, CheckCircleOutlined, CloseSquareFilled, CheckSquareFilled, LikeOutlined } from '@ant-design/icons';
import style from './AdminHome.module.css'
import Layout from '../LayoutAdmin/LayoutAdmin'
import { getData } from './action'
import { getList as getListCar } from '../Car/action'
import { getList as getListAccessory } from '../Accessory/action'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { PureComponent } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, Text, PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

function AdminHome(props) {
    const history = useHistory()
    useEffect(() => {
        props.getData()
        props.getListCar()
        props.getListAccessory()
    }, [])
    const dataUser = [
        {
            name: 'Group A', value: props?.adminData?.user?.filter(item => {
                return item.active === true
            }).length,
        },
        {
            name: 'Group B', value: props?.adminData?.user?.filter(item => {
                return item.active === false
            }).length
        },
    ];
    const dataCarOrder = [
        {
            name: 'Group A', value: props?.adminData?.carOrder.filter(item => {
                return item.status === 'Pending'
            }).length,
        },
        {
            name: 'Group B', value: props?.adminData?.carOrder.filter(item => {
                return item.status === 'Accepted'
            }).length,
        },
        {
            name: 'Group C', value: props?.adminData?.carOrder.filter(item => {
                return item.status === 'Success'
            }).length,
        },
        {
            name: 'Group D', value: props?.adminData?.carOrder.filter(item => {
                return item.status === 'Cancelled'
            }).length,
        },

    ]
    const formatXAxis = (tickItem) => {
        const d = new Date(tickItem);
        return d.toLocaleString("default", { month: "long" });
    };
    const COLORSUSER = ["#008000", "#FF0000"];
    const COLORCARORDER = ["#f0a500", "#008000", "#0000FF", "#FF0000"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <Layout>
                <h2 style={{ textAlign: "center" }}>T???ng quan</h2>
                <div className={`${style.AdminHome} site-statistic-demo-card`}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col xs={24} xl={12} lg={12} sm={24} md={24}>
                            <Card>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic
                                            title="S??? l?????ng ng?????i d??ng"
                                            value={props?.adminData?.user?.length}

                                            prefix={<UserOutlined className={`${style.userIcon} ${style.iconPrefix}`} />}
                                        />
                                        <Statistic
                                            title="S??? l?????ng ng?????i d??ng ho???t ?????ng"
                                            value={props?.adminData?.user?.filter(item => {
                                                return item.active === true
                                            }).length}

                                            prefix={<UserAddOutlined className={`${style.ActiveUserIcon} ${style.iconPrefix}`} />}
                                            style={{ color: "008000" }}
                                            className="activeUser"
                                        />
                                        <Statistic
                                            title="S??? l?????ng ng?????i d??ng kh??ng ho???t ?????ng"
                                            value={props?.adminData?.user?.filter(item => {
                                                return item.active === false
                                            }).length}
                                            style={{ color: "FF0000" }}
                                            className="inactiveUser"
                                            prefix={<UserDeleteOutlined className={`${style.inactiveUserIcon} ${style.iconPrefix}`} />}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <div className={`${style.pieChart1}`}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart >
                                                    <Pie
                                                        data={dataUser}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderCustomizedLabel}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {dataUser.map((entry, index) => (
                                                            <Cell label={renderCustomizedLabel} key={`cell-${index}`} fill={COLORSUSER[index % COLORSUSER.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Label></Label>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic
                                            title="S??? ????n ?????t mua b??o"
                                            value={props?.adminData?.accessoryBill?.length}
                                            prefix={<WalletOutlined className={`${style.accessoryBillIcon} ${style.iconPrefix}`} />}
                                        />
                                        <Button
                                            onClick={() => history.push('/admin/accessory-bill')}
                                            type="primary"
                                        >
                                            Xem th??m
                                        </Button>
                                        <Statistic
                                            title="S??? l?????ng b??i vi???t"
                                            value={props?.postAdmin?.data?.post?.length}
                                            prefix={<EditOutlined className={`${style.postIcon} ${style.iconPrefix}`} />}
                                        />
                                        <Button
                                            onClick={() => history.push('/admin/post')}
                                            type="primary"
                                        >
                                            Xem th??m
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Statistic
                                            title="S??? xe hi???n c??"
                                            value={props?.carData?.data?.car?.length}
                                            prefix={<CarOutlined className={`${style.accessoryBillIcon} ${style.iconPrefix}`} />}
                                        />
                                        <Button
                                            onClick={() => history.push('/admin/car')}
                                            type="primary"
                                        >
                                            Xem th??m
                                        </Button>
                                        <Statistic
                                            title="S??? b??o hi???n c??"
                                            value={props?.accData?.data?.accessory?.length}
                                            prefix={<DingtalkOutlined className={`${style.postIcon} ${style.iconPrefix}`} />}
                                        />
                                        <Button
                                            onClick={() => history.push('/admin/accessory')}
                                            type="primary"
                                        >
                                            Xem th??m
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>

                        </Col>
                        <Col xs={24} xl={12} lg={12} sm={24} md={24}>
                            <Card>
                                <Row gutter={16} >
                                    <Col span={12}>
                                        <Statistic
                                            title="T???ng s??? ????n ?????t c???c xe"
                                            value={props?.adminData?.carOrder?.length}
                                        />
                                        <Button
                                            onClick={() => history.push('/admin/car-order')}
                                            type="primary"
                                        >
                                            Xem th??m
                                        </Button>
                                        <Statistic
                                            title="S??? ????n ?????t c???c ch??? ?????i"
                                            prefix={<ExclamationCircleOutlined className={`${style.pendingOrder} ${style.iconPrefix}`} />}
                                            value={props?.adminData?.carOrder?.filter(item => {
                                                return item.status === 'Pending'
                                            }).length}
                                        />
                                        <Statistic
                                            title="S??? ????n ???????c ch???p nh???n"
                                            prefix={<CheckCircleOutlined className={`${style.acceptedOrder} ${style.iconPrefix}`} />}
                                            value={props?.adminData?.carOrder?.filter(item => {
                                                return item.status === 'Accepted'
                                            }).length}

                                        />
                                        <Statistic
                                            title="S??? ????n ???? th??nh c??ng"
                                            prefix={<CheckSquareFilled className={`${style.ActiveUserIcon} ${style.iconPrefix}`} />}
                                            value={props?.adminData?.carOrder?.filter(item => {
                                                return item.status === 'Success'
                                            }).length}
                                        />
                                        <Statistic
                                            title="S??? ????n ???? h???y"
                                            prefix={<CloseSquareFilled className={`${style.inactiveUserIcon} ${style.iconPrefix}`} />}
                                            value={props?.adminData?.carOrder?.filter(item => {
                                                return item.status === 'Cancelled'
                                            }).length}
                                        />
                                        {/* <Statistic
                                    title="S??? ????n ?????t b??o"
                                    value={props?.adminData?.accessoryBill?.length}
                                />
                                <Button
                                    onClick={() => history.push('admin/accessory')}
                                    type="primary"
                                    >
                                        Xem th??m
                                    </Button> */}
                                    </Col>
                                    <Col span={12}>
                                        <div className={`${style.pieChart}`}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={dataCarOrder}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderCustomizedLabel}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {dataCarOrder.map((entry, index) => (
                                                            <Cell
                                                                label={renderCustomizedLabel}
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORCARORDER[index % COLORCARORDER.length]
                                                                }
                                                            />
                                                        ))}
                                                    </Pie>
                                                    <Label></Label>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col xs={24} xl={12} lg={12} sm={24} md={24}>
                            <Card>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic
                                            title="T???ng s??? ????n ?????t mua b??o"
                                            value={props?.adminData?.accessoryBill?.length}
                                        />
                                        <Button
                                            onClick={() => history.push("/admin/car-order")}
                                            type="primary"
                                        >
                                            Xem th??m
                                        </Button>
                                        <Statistic
                                            title="S??? ????n ?????t mua ch??? duy???t"
                                            prefix={
                                                <ExclamationCircleOutlined
                                                    className={`${style.pendingOrder} ${style.iconPrefix}`}
                                                />
                                            }
                                            value={
                                                props?.adminData?.accessoryBill?.filter((item) => {
                                                    return item.status === "Pending";
                                                }).length
                                            }
                                        />
                                        <Statistic
                                            title="S??? ????n ???????c ???? duy???t"
                                            prefix={
                                                <CheckCircleOutlined
                                                    className={`${style.acceptedOrder} ${style.iconPrefix}`}
                                                />
                                            }
                                            value={
                                                props?.adminData?.accessoryBill?.filter((item) => {
                                                    return item.status === "Accepted";
                                                }).length
                                            }
                                        />
                                        <Statistic
                                            title="S??? ????n ???? giao th??nh c??ng"
                                            prefix={
                                                <CheckSquareFilled
                                                    className={`${style.ActiveUserIcon} ${style.iconPrefix}`}
                                                />
                                            }
                                            value={
                                                props?.adminData?.accessoryBill?.filter((item) => {
                                                    return item.status === "Success";
                                                }).length
                                            }
                                        />
                                        <Statistic
                                            title="S??? ????n ???? h???y"
                                            prefix={
                                                <CloseSquareFilled
                                                    className={`${style.inactiveUserIcon} ${style.iconPrefix}`}
                                                />
                                            }
                                            value={
                                                props?.adminData?.carOrder?.filter((item) => {
                                                    return item.status === "Cancelled";
                                                }).length
                                            }
                                        />
                                        {/* <Statistic
                                    title="S??? ????n ?????t b??o"
                                    value={props?.adminData?.accessoryBill?.length}
                                />
                                <Button
                                    onClick={() => history.push('admin/accessory')}
                                    type="primary"
                                    >
                                        Xem th??m
                                    </Button> */}
                                    </Col>
                                    <Col span={12}>
                                        <div className={`${style.pieChart}`}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={dataCarOrder}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderCustomizedLabel}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {dataCarOrder.map((entry, index) => (
                                                            <Cell
                                                                label={renderCustomizedLabel}
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORCARORDER[index % COLORCARORDER.length]
                                                                }
                                                            />
                                                        ))}
                                                    </Pie>
                                                    <Label></Label>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col xs={24} xl={12} lg={24} sm={24} md={24}>
                            <div className={`${style.lineChartContainer}`}>
                                <h3>S??? l?????ng ????n b??o theo ng??y</h3>
                                <div className={`${style.lineChartCon}`}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            className={`${style.lineChart}`}
                                            data={
                                                props?.adminData?.orderCount.map((item) => {
                                                    return { ...item, Tong_don_hang: item.total_order };
                                                }) || []
                                            }
                                            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                                        >
                                            <XAxis tickFormatter={formatXAxis} dataKey="_id" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend></Legend>
                                            <Line
                                                type="monotone"
                                                interval={10}
                                                dataKey="Tong_don_hang"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} xl={12} lg={24} sm={24} md={24}>
                            <div className={`${style.lineChartContainer}`}>
                                <h3>S??? l?????ng ????n ?????t c???c theo ng??y</h3>
                                <div className={`${style.lineChartCon}`}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            className={`${style.lineChart}`}
                                            data={
                                                props?.adminData?.orderCount.map((item) => {
                                                    return { ...item, Tong_don_hang: item.total_order };
                                                }) || []
                                            }
                                            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                                        >
                                            <XAxis tickFormatter={formatXAxis} dataKey="_id" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Legend></Legend>
                                            <Line
                                                type="monotone"
                                                interval={10}
                                                dataKey="Tong_don_hang"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </div>
    );
}
const mapStateToProps = (state) => ({
    adminData: state.adminData,
    postAdmin: state.postAdmin,
    carData: state.car,
    accData: state.accessory
})

const mapDispatchToProps = dispatch => ({
    getData: (params) => {
        dispatch(getData(params))
    },
    getListCar: (params) => {
        dispatch(getListCar(params))
    },
    getListAccessory: (params) => {
        dispatch(getListAccessory(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
